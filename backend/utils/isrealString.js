let isrealString = (str)=>{
    return typeof str === 'string' && str.trim().length > 0;
}

module.exports = {isrealString}