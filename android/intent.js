Java.perform(function () {
    try {
        // Get the Intent class
        var Intent = Java.use("android.content.Intent");

        // Get the Activity class
        var Activity = Java.use("android.app.Activity");

        // --- Hooking the Intent constructor ---
        // We will hook into one of the most common Intent constructors
        // This constructor takes a Context and a Class, typically used to switch Activities
        Intent.$init.overload('android.content.Context', 'java.lang.Class').implementation = function (context, cls) {
            // Call the original constructor to create the Intent object
            this.$init(context, cls);

            // Get information from the newly created Intent
            var component = this.getComponent();
            var extras = this.getExtras();

            console.log("--- INTENT CREATED ---");
            if (component) {
                console.log("  -> Component: " + component.toString());
            }
            if (extras) {
                console.log("  -> Extras: " + extras.toString());
            } else {
                console.log("  -> No Extras.");
            }
            console.log("-----------------------");
        };

        // --- Hooking the Activity's startActivity method ---
        // Hook into the startActivity method that takes an Intent
        Activity.startActivity.overload('android.content.Intent').implementation = function (intent) {
            // Get the name of the current Activity calling the method
            var currentActivity = this.getClass().getName();

            // Get information about the Intent being used
            var component = intent.getComponent();
            var action = intent.getAction();
            var data = intent.getData();
            var extras = intent.getExtras();

            console.log("--- ACTIVITY TRANSITION ---");
            console.log("  -> From Activity: " + currentActivity);

            if (component) {
                console.log("  -> To Component: " + component.toString());
            }
            if (action) {
                console.log("  -> Action: " + action);
            }
            if (data) {
                console.log("  -> Data: " + data.toString());
            }
            if (extras) {
                console.log("  -> Extras: " + extras.toString());
            } else {
                console.log("  -> No Extras.");
            }

            console.log("----------------------------------");

            // Call the original method to continue the Activity transition
            this.startActivity(intent);
        };

        console.log("[*] Successfully hooked Intent and startActivity methods!");

    } catch (e) {
        console.log("[!] Error hooking: " + e);
    }
});
