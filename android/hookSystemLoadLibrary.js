const System = Java.use("java.lang.System");
const Runtime = Java.use("java.lang.Runtime");
const SystemLoad_2 = System.loadLibrary.overload("java.lang.String");
const VMStack = Java.use("dalvik.system.VMStack");

SystemLoad_2.implementation = function (library) {
    console.log("Loading dynamic library => " + library);
    try {
        if (library === "native-lib") {
            console.log("Hmmmmm....")
            const baseAddress = Module.findBaseAddress("native-lib.so");
            console.log(baseAddress)
        }
        return Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(), library);
    } catch (ex) {
        console.log(ex);
    }
};
