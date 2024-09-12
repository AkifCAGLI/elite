export default client => {
    client.on('ready', async () => {
        console.log(`${client.user.username} iş başında`);
    })
}

process.on('uncaughtException', (err) => {
    console.error('Beklenmeyen bir hata oluştu:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Beklenmeyen bir Reddetme:', reason);
});