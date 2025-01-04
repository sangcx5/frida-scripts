function aWaitingLoadLibrary() {
    var library_name = "libnative.so";
    var library_loaded = 0;
    Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
      onEnter: function (args) {
        // first arg is the path to the library loaded
        let library_path = Memory.readCString(args[0]);
        if (library_path.includes(library_name)) {
          console.log("[.] Loading library : " + library_path);
          library_loaded = 1;
        }
      },
      onLeave: function (args) {
        //if it's the library we want to hook, hooking it
        if (library_loaded == 1) {
          console.log("[+] Loaded");
          var BaseAddr = Module.findBaseAddress("libnative.so");
          console.log("BaseAddr:" + BaseAddr);
          //Now we will hook the callback func
          hook_func()
          //library_loaded=0
          return BaseAddr;
        }
      },
    });
  }
