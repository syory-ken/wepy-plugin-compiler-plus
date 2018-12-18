
function extend(target, second) {
    for (let name in second) {
        target[name] = second[name];
    }
    return target;
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = {
    extend,
    deepCopy
}
