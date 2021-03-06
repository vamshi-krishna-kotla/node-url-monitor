/**
 * Helpers for various tasks
 * 
 */

// Dependencies
const fs = require('fs');
const path = require('path');

// Required paths for base templates and views
const templates = path.resolve(__dirname,'../templates/');
const views = path.resolve(__dirname,'../views/');

//  Container for all the helpers
var helpers = {};

/**
 * Return the page layout HTML for the requested page, including the global header and footer
 * 
 * @param {String} fileName : name of the view that is requested
 * @param {Function} callback : returns entire page layout including the header and footer or an error
 */
helpers.findPage = function (fileName, callback) {
	try {
		var baseTemplate = fs.readFileSync(views+'/'+fileName+'.html','utf8');

		var header = fs.readFileSync(templates+'/_header.html', 'utf8');
		var footer = fs.readFileSync(templates+'/_footer.html', 'utf8');
	
		var page = baseTemplate.replace('%%HEADER_PLACEHOLDER%%', header).replace('%%FOOTER_PLACEHOLDER%%', footer);

		callback(false, page);
	} catch (err) {
		callback(err);
	}
};

// export the container
module.exports = helpers;