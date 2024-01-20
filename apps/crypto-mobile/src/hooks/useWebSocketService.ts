import { HeartbeatResponse } from '@/interfaces/HeartbeatResponse';
import { RequestForQuote } from '@/interfaces/RequestForQuote';
import { TicketResponse } from '@/interfaces/TickerResponse';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

type SocketResponse =
  | TicketResponse
  | HeartbeatResponse
  | RequestForQuote
  | undefined;

const messageParser = (message: SocketResponse) => {
  switch (message.type) {
    case 'ticker': {
      message = message as TicketResponse;
      const ticketRes: TicketResponse = {
        best_ask: message.best_ask,
        best_ask_size: message.best_ask_size,
        best_bid: message.best_bid,
        best_bid_size: message.best_bid_size,
        high_24h: message.high_24h,
        last_size: message.last_size,
        low_24h: message.low_24h,
        open_24h: message.open_24h,
        price: message.price,
        product_id: message.product_id,
        sequence: message.sequence,
        side: message.side,
        time: message.time,
        trade_id: message.trade_id,
        type: message.type,
        volume_24h: message.volume_24h,
        volume_30d: message.volume_30d,
      };
      return ticketRes;
    }

    case 'heartbeat': {
      message = message as HeartbeatResponse;
      const heartbeatRes: HeartbeatResponse = {
        last_trade_id: message.last_trade_id,
        product_id: message.product_id,
        sequence: message.sequence,
        time: message.time,
        type: message.type,
      };
      return heartbeatRes;
    }

    case 'rfq_match': {
      message = message as RequestForQuote;
      const requestForQuoteRes: RequestForQuote = {
        maker_order_id: message.maker_order_id,
        price: message.price,
        product_id: message.product_id,
        side: message.side,
        size: message.size,
        taker_order_id: message.taker_order_id,
        time: message.time,
        type: message.type,
      };
      return requestForQuoteRes;
    }

    default:
      return undefined;
  }
};

export const useWebSocketService = () => {
  const [socketUrl, setSocketUrl] = useState(
    'wss://ws-feed.exchange.coinbase.com'
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const [tickerHistory, setTickerHistory] = useState<TicketResponse[]>([]);
  const [heartbeatHistory, setHeartbeatHistory] = useState<HeartbeatResponse[]>(
    []
  );
  const [requestForQuoteHistory, setRequestForQuoteHistory] = useState<
    RequestForQuote[]
  >([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      share: true,
    }
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log('lastMessage', lastJsonMessage);
      const result = messageParser(lastJsonMessage as SocketResponse);
      setMessageHistory((prev) => prev.concat(lastJsonMessage));

      switch (result?.type) {
        case 'ticker': {
          const tickerRes = result as TicketResponse;
          setTickerHistory((prev) => prev.concat(tickerRes));
          break;
        }

        case 'heartbeat': {
          const heartbeatRes = result as HeartbeatResponse;
          setHeartbeatHistory((prev) => prev.concat(heartbeatRes));
          break;
        }

        case 'rfq_match': {
          const requestForQuoteRes = result as RequestForQuote;
          setRequestForQuoteHistory((prev) => prev.concat(requestForQuoteRes));
          break;
        }

        default:
          break;
      }
    }
  }, [lastJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    connectionStatus,
    messageHistory,
    tickerHistory,
    heartbeatHistory,
    requestForQuoteHistory,
    setSocketUrl,
  };
};
