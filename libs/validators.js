const rValidId = /^(?:[a-z0-9]+(?:-[a-z0-9]+)*)$/

function isPluginId(pluginId) {
  return rValidId.test(pluginId)
}
exports.isPluginId = isPluginId

function isRequired(value) {
  return !!value
}
exports.isRequired = isRequired
