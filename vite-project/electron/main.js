// electron/main.js
import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

// __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { nativeTheme } from "electron";

// включить тёмную тему независимо от OS
nativeTheme.themeSource = "dark";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false,
    // },
    // frame: true,
    // transparent: true, // включаем прозрачность
    // vibrancy: "sidebar", // тип размытия macOS: 'light', 'dark', 'sidebar', 'menu', 'popover'...
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadURL("http://localhost:5173"); // тут открывается
    // win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
