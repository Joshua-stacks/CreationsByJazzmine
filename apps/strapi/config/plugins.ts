export default ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        localServer: {
          sizeLimit: 100000,
        },
      },
    },
  },
});
