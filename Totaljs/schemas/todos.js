NEWSCHEMA('Todos', function(schema) {
    schema.action('list', {
        name: 'List todos',
        query: 'search:String',
        action: function($) {
            var builder = DB().find('nosql/todos'); 
            builder.where('isremoved', false);
            // enable searching via request query parameter
            $.query.search && builder.search('search', $.query.search);
            builder.fields('id,name,isdone,description');
            builder.callback($.callback);
        }
    });

    schema.action('create', {
        name: 'Create new todo',
        input: '*name:String,description:String,isdone:String',
        action: function($, model) {
            model.id = UID();
            model.isdone = false;
            model.search = (model.name + ' ' + model.description || '').toSearch();
            model.isremoved = false;
            model.dtcreated = NOW;
            DB().insert('nosql/todos', model).callback($.done(model.id));
        }
    });

    schema.action('read', {
        name: 'Read specific todo',
        params: '*id:String',
        action: function($) {
            var params = $.params;
         DB().read('nosql/todos').fields('id,name,isdone,description').id(params.id).where('isremoved', false).error(404).callback($.callback);
        }
    });


    schema.action('update', {
        name: 'Update todo',
        params: '*id:String',
        input: '*name:String,description:String,isdone:String',
        action: function($, model) {
            var params = $.params;
            model.dtupdated = NOW;
            model.search = (model.name + ' ' + model.description || '').toSearch();
            DB().update('nosql/todos', model).id(params.id).where('isremoved', false).error(404).callback($.done());
        }
    });


    schema.action('remove', {
        name: 'Remove a todo',
        params: '*id:String',
        action: function($) {
            var params = $.params;
            DB().update('nosql/todos', { isremoved: true, dtremoved: NOW }).id(params.id).where('isremoved', false).error(404).callback($.done());
        }
    });

    schema.action('done', {
        name: 'Toggle done/undone status of todo',
        params: '*id:String',
        action: function($) {
            var params = $.params;
            DB().update('nosql/todos', { '!isdone': true }).id(params.id).where('isremoved', false).error(404).callback($.done());
        }
    })
});