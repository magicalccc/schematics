export enum <%= classify(name) %>OpenApi {
  <%= classify(name) %> = '<%= classify(name) %> user API',
}

export enum CommonOpenApi {
  ServerSettings = 'Server settings API for admin.',
  ConnectedDevice = 'Connected device API for mobile callbacks.',
  Connect = 'Connect API for token management.',
  Setup = 'Initial setup API.',
}
