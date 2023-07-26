

// by this you can export the module and actually the
// export is a javscript object so you can make as much 
// functions as you like and export them in described below way

// actually we can use anonimous functions and save up a lot of names repeatations

// module.exports iss equal to exports

exports.getDate = function() {
    const today = new Date();
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    return today.toLocaleDateString("en-US", options);
};

exports.getDay = function() {
    const today = new Date();
    
    const options = {
        weekday: "long",
    };
    return today.toLocaleDateString("en-US", options);
};
