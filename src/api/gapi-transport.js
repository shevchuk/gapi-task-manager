import '../contrib/gapi';

export const config = {
    // Client ID and API key from the Developer Console
    CLIENT_ID : '19125975415-9vvkk7lnu602sbkf2hlln59gvli7e40c.apps.googleusercontent.com',
    API_KEY : 'AIzaSyAgLBR-7uqEa35GYx4jOg9nleb0VezRTPs',
    DISCOVERY_DOCS : ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
    SCOPES : 'https://www.googleapis.com/auth/tasks'
}

/**
*  On load, called to load the auth2 library and API client library.
*/
export function initGAPI(cb) {
    window.gapi.load('client:auth2', initClient(cb));
}

export function signIn() {
    return new Promise((resolve) => {
        window.gapi.auth2.getAuthInstance().signIn().then((response) => {
            window.gapi.client.tasks.tasklists.list({
                'maxResults': 100
            }).then(function(response) {
                resolve(response);
            });
        });
    });
}

export function loadTasks(taskList) {
    return new Promise((resolve) => {
        window.gapi.client.tasks.tasks.list({
            'tasklist': taskList,
            'maxResults': 100
        }).then(function(response) {
            resolve(response);
        });
    });
}

export function createNewTask(taskList) {
    return new Promise((resolve) => {
        window.gapi.client.tasks.tasks.insert({
            'tasklist' : taskList
        }).then(function(response) {
            resolve(response);
        })
    });
}

export function patchTask(task, taskList, patch) {
    return new Promise((resolve) => {
        window.gapi.client.tasks.tasks.patch({
            'tasklist': taskList,
            'task': task,
            ...patch
        }).then(function(response) {
            resolve(response);
        });
    });
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient(cb) {
    
    // Listen for sign-in state changes.
    //initGAPI();
    //window.gapi.auth2.getAuthInstance().signIn();

    return function() {
        window.gapi.client.init({
            apiKey: config.API_KEY,
            clientId: config.CLIENT_ID,
            discoveryDocs: config.DISCOVERY_DOCS,
            scope: config.SCOPES
        }).then((response) => {
            cb();
        });
    }
}


