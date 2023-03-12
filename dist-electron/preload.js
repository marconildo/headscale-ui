var import_electron = require("electron");
const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
  sendMessage: (message) => {
    import_electron.ipcRenderer.send("message", message);
  },
  /**
    Here function for AppBar
   */
  Minimize: () => {
    import_electron.ipcRenderer.send("minimize");
  },
  Maximize: () => {
    import_electron.ipcRenderer.send("maximize");
  },
  Close: () => {
    import_electron.ipcRenderer.send("close");
  },
  /**
   * Provide an easier way to listen to events
   */
  on: (channel, callback) => {
    import_electron.ipcRenderer.on(channel, (_, data) => callback(data));
  }
};
import_electron.contextBridge.exposeInMainWorld("Main", api);
import_electron.contextBridge.exposeInMainWorld("ipcRenderer", import_electron.ipcRenderer);

//# sourceMappingURL=preload.js.map