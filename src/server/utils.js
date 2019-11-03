const request = require("request");
const Task = require("data.task");
const Either = require("data.either");

const ServerError = response => error => {
  console.error(error);
  response.status(500).send("Error");
};

const ServerSuccess = response => data => {
  response.send(data);
};

const httpGet = url =>
  new Task((reject, resolve) =>
    request(url, (error, response, body) =>
      error ? reject(error) : resolve(body)
    )
  );

const eitherToTask = either => either.fold(Task.rejected, Task.of);
const tryCatch = Either.try;
const parse = tryCatch(JSON.parse);

const getJson = url =>
  httpGet(url)
    .map(parse)
    .chain(eitherToTask);

const assign = (target, source) => Object.assign({}, target, source);

const addScripts = scripts => data => assign(data, { scripts });
const addStyles = styles => data => assign(data, { styles });
const render = View => data =>
  Either.of(data)
    .map(tryCatch(View))
    .chain(eitherToTask);

module.exports = {
  ServerSuccess,
  ServerError,
  eitherToTask,
  parse,
  getJson,
  assign,
  addScripts,
  addStyles,
  tryCatch,
  render
};
