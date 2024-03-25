exports.install = function () {
    //  Http_method    Uri           *Schema_name  --> action_name
    ROUTE('GET         /todos/list/          *Todos   --> list');                    
    ROUTE('POST        /todos/create/        *Todos   --> create');                   
    ROUTE('GET         /todos/read/{id}/     *Todos   --> read');                   
    ROUTE('UPDATE      /todos/updates/{id}/  *Todos   --> update'); 
    ROUTE('DELETE      /todos/remove/{id}/   *Todos   --> remove');
    ROUTE('GET         /todos/toggle/{id}/   *Todos   --> done');
                   
}