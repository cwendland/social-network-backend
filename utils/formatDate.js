module.exports = {
    formatDate(date) {
        return date.toLocalDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    },
};