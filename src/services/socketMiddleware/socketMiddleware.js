export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restData } = parsedData;

          dispatch({ type: onMessage, payload: restData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        // if (type === "WS_SEND_MESSAGE") {
        //   const orders = { ...payload };
        //   // функция для отправки сообщения на сервер
        //   socket.send(JSON.stringify(orders));
        // }
      }

      next(action);
    };
  };
};
