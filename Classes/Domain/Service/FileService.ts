module FileService {
	/**
	 * read file on harddisk
	 *
	 * @param file: file path
	 * @param callback: function to call on success
	 */
	export function readFile(file, callback) {
		if (file) {
			var reader = new FileReader();
			reader.onload = function(event) {
				callback(event.target.result);
			};
			reader.readAsText(file);
		}
	};

	/**
	 * rad files from harddisk
	 *
	 * @param files
	 * @param callback
	 */
	export function readFiles(files, callback) {
		var fileContents = [];

		for(var index=0; index<files.length; index++) {
			var file = files[index];
			if (file) {
				var reader = new FileReader();
				(function(i) {
					reader.onload = function(event) {
						fileContents.push(event.target.result);
						if(i == (files.length-1)) {
							callback(fileContents);
						}
					};
				})(index);
				reader.readAsText(file);
			}
		}
	};
}

export = FileService;