enum HostEvent {
  "NAVIGATE" = "host:navigate",
}

export const HOST_APP_CHANNEL = {
  NAVIGATE: {
    EVENT: HostEvent.NAVIGATE,
    SCHEMA: {
      type: "object",
      properties: {
        pathname: {
          type: "string",
        },
      },
      required: ["pathname"],
    },
  },
};

enum AuthEvent {
  "NAVIGATE" = "auth:navigate",
}

export const AUTH_APP_CHANNEL = {
  NAVIGATE: {
    EVENT: AuthEvent.NAVIGATE,
    SCHEMA: {
      type: "object",
      properties: {
        pathname: {
          type: "string",
        },
      },
      required: ["pathname"],
    },
  },
};
