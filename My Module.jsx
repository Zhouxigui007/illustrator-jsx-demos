﻿/**
 * @author Scott Lewis <scott@iconify.it>
 * @copyright 2017 Scott Lewis
 * @version 1.0.0
 * @url http://github.com/iconifyit
 *
 * ABOUT:
 *
 *    This script is a simple demo of an Adobe Illustrator ExtendScript written using the Module pattern.
 *    The script doesn't really do anything except demonstrate a rough outline for how to build clean,
 *    readable and well-organized scripts for Adobe Illustrator. Others, no doubt, have different
 *    ideas but I am always trying to make my code cleaner, better organized, more reusable, and
 *    more extensible.
 *
 * USAGE:
 *
 * 1. Place this script in Applications > Adobe Illustrator > Presets > en_US > Scripts
 * 2. Restart Adobe Illustrator to activate the script
 * 3. The script will be available under menu File > Scripts > My Module
 *
 * NO WARRANTIES:
 *
 *   You are free to use, modify, and distribute this script as you see fit.
 *   No credit is required but would be greatly appreciated.
 *
 *   THIS SCRIPT IS OFFERED AS-IS WITHOUT ANY WARRANTY OR GUARANTEES OF ANY KIND.
 *   YOU USE THIS SCRIPT COMPLETELY AT YOUR OWN RISK AND UNDER NO CIRCUMSTANCES WILL
 *   THE DEVELOPER AND/OR DISTRIBUTOR OF THIS SCRIPT BE HELD LIABLE FOR DAMAGES OF
 *   ANY KIND INCLUDING LOSS OF DATA OR DAMAGE TO HARDWARE OR SOFTWARE. IF YOU DO
 *   NOT AGREE TO THESE TERMS, DO NOT USE THIS SCRIPT.
 */

/**
 * Give the script a name.
 */
#script "My Module";

/**
 * Declare the target app.
 */
#target illustrator

/**
 * Set includes path.
 * This can be a semi-colon separated list.
 */
#includepath "inc/";

/**
 * Include the libraries we need.
 * Includes can be a file name only. No leading slash /.
 */
#include "JSON.jsx";
#include "Utils.jsx";
#include "Logger.jsx";

/**
 * Disable Illustrator's alerts.
 */
Utils.displayAlertsOff();

/**
 * Set some global variables.
 */
var DATE_STRING      = Utils.dateFormat(new Date().getTime());
var SESSION_FILENAME = "ai-" + DATE_STRING + "-r1.json";

/**
 * @type {{
 *    APP_NAME   : sring,
 *    SRCFOLDER  : string,
 *    LOGFOLDER  : string,
 *    LOGFILE    : string
 * }}
 */
var CONFIG = {
    APP_NAME         : "my-module",
    SRCFOLDER        : $.getenv("HOME") + "/my-module",
    LOGFOLDER        : $.getenv("HOME") + "/my-module/var/logs",
    LOGFILE          : $.getenv("HOME") + "/my-module/var/logs/log-"  + DATE_STRING  + "-r1.log"
};

/**
 * Run the script using the Module pattern. This pattern isn't required,
 * but it is a nice clean and organized way to write the code. It also avoids
 * cluttering the global scope.
 */
var MyModule = (function(CONFIG) {

    /**
     * The module dialog.
     * @type {Window}
     */
    var dialog = null;

    /**
     * The local scope logger object.
     * @type {Logger}
     */
    var logger = new Logger(CONFIG.APP_NAME, CONFIG.LOGFOLDER);

    /**
     * The Dialog for this module.
     * @returns {*}
     * @constructor
     */
    var Dialog = function() {

        /**
         * Prototype object so we can extend this class.
         * @type {{}}
         */
    	this.prototype = {};


        /**
         * Create the dialog window.
         */
        dialog = Utils.window(
            "dialog",
            localize({en_US: "My Module"}),
            350, 350
        );

        /**
         * The message box.
         */
        dialog.msgBox = dialog.add("statictext", [30,30,300,60], "");

        /**
         * The cancel button.
         */
        dialog.closeBtn = dialog.add("button", [30,275,120,315], "Close", {name:"close"});
        dialog.closeBtn.onClick = this.doCloseCallback;
        dialog.closeBtn.enabled = true;

        /**
         * The Open button.
         */
        dialog.openBtn = dialog.add("button", [130,275,220,315], "Open", {name:"open"});
        dialog.openBtn.onClick = this.doOpenCallback;
        dialog.openBtn.enabled = true;

        /**
         * The Save button.
         */
        dialog.saveBtn = dialog.add("button", [230,275,320,315], "Save", {name:"save"});
        dialog.saveBtn.onClick = this.doSaveCallback;
        dialog.saveBtn.enabled = false;

        return dialog;
    };

    /**
     * Close button callback.
     */
    Dialog.prototype.doCloseCallback = function() {

        dialog.msgBox.text = localize({en_US: "Close button clicked."});
        dialog.close();
        Utils.displayAlertsOn();
    };

    /**
     * Callback to open the selected session.
     */
    Dialog.prototype.doOpenCallback = function() {

        dialog.msgBox.text = localize({en_US: "Open button clicked."});
        dialog.saveBtn.enabled = true;
    };

    /**
     * Saves the current session.
     */
    Dialog.prototype.doSaveCallback = function() {
        dialog.msgBox.text = localize({en_US: "Save button clicked."});
        dialog.saveBtn.enabled = false;
    };

    /**
     * Returns the public module object/interface.
     */
    return {
        /**
         * Runs the module code.
         */
        run: function() {
            new Dialog().show();
        }
    }

})(CONFIG);


/**
 * Run the module.
 */
MyModule.run();
