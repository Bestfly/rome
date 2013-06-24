/**
 * This module contains the implementation of service resource processor, 
 * which is designed to describe a managed service.
 * 
 * @module caligula.components.configuration.resources.service
 */
Condotti.add('caligula.components.configuration.resources.service', function (C) {
    
    /**
     * This ServiceResourceProcessor is designed to describe a managed service
     * to be run on the target nodes. A typical service resource is defined as
     * following:
     * '${service name}': { // which is also the name of the script in init.d
     *                      // or rc.d used to manage the service
     *     'type': 'service', // indicate this resource is a service resource
     *     'enable': true,
     *     'reload': true,
     *     'watch': {
     *         'packages': ['${name of package}']
     *     }
     * }
     * 
     * @class ServiceResourceProcessor
     * @constructor
     * @extends ResourceProcessor
     */
    function ServiceResourceProcessor () {
        /* inheritance */
        this.super();
    }
    
    C.lang.inherit(ServiceResourceProcessor, 
                   C.caligula.configuration.resources.ResourceProcessor);
    
    /**
     * Generate the description sls for it based on the passed-in resource and 
     * context.
     * 
     * @method process
     * @param {Object} resource the resource object to be processed
     * @param {Object} context the context data associated with this processing
     * @param {Function} callback the callback function to be invoked after the
     *                            resource has been successfully processed, or
     *                            some unexpected error occurs. The signature of
     *                            the callback is 'function (error, result) {}'
     */
    ServiceResourceProcessor.prototype.process = function (action, name, 
                                                           resource, context, 
                                                           directory, callback) {
        var self = this,
            logger = C.logging.getStepLogger(this.logger_),
            params = action.data,
            path = null,
            service = ['rununing'],
            watch = null,
            packages = null,
            salt = {};
                
        service.push({ enable: resource.enable });
        service.push({ reload: resource.reload });
        if (resource.watch) {
            watch = [];
            packages = resource.watch.packages || [];
            packages.forEach(function (package) {
                watch.push({ pkg: package });
            });
            service.push({ watch: watch });
        }
        
        salt[name] = {'service': service };
        
        path = C.natives.path.resolve(directory, name + '.sls');
        
        logger.start('Saving the generated content ' +
                     C.lang.reflect.inspect(salt) + ' into file ' + path);
                     
        C.natives.fs.writeFile(
            path, 
            JSON.stringify(salt, null, 4), 
            function (error) {
                action.data = params;
                
                if (error) {
                    logger.error(error);
                    callback(error);
                    return;
                }
                
                logger.done();
                callback();
            }
        );
    };
    
    C.namespace('caligula.configuration.resources').TemplateResourceProcessor = TemplateResourceProcessor;
    
    
}, '0.0.1', { requires: [ 'caligula.components.configuration.resources.base' ] });
