const UPSTASH_REDIS_REST_URL = import.meta.env.VUE_APP_UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_TOKEN = import.meta.env.VUE_APP_UPSTASH_REDIS_TOKEN;

interface PollOption {
  id: string;
  title: string;
  voteCount: number;
}

export interface PollData {
  question: string;
  options: PollOption[];
}

function getHeaders(): Headers {
  return new Headers({
    Authorization: `Bearer ${UPSTASH_REDIS_TOKEN}`,
    'Content-Type': 'application/json',
  });
}

export async function getPollFromCache(pollId: string): Promise<PollData | null> {
  const key = `poll:${pollId}`;
  const url = `${UPSTASH_REDIS_REST_URL}/get/${key}`;

  try {
    const response = await fetch(url, { headers: getHeaders() });
    const data = await response.json();

    if (response.ok && data.result) {
      return JSON.parse(data.result);
    }
    return null;
  } catch (error) {
    console.error('Error fetching from Redis:', error);
    return null;
  }
}

export async function setPollToCache(pollId: string, pollData: PollData, ttlSeconds = 30): Promise<boolean> {
  const key = `poll:${pollId}`;
  const url = `${UPSTASH_REDIS_REST_URL}/set/${key}`;

  try {
    const body = {
      value: JSON.stringify(pollData),
      EX: ttlSeconds,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return response.ok && data.result === 'OK';
  } catch (error) {
    console.error('Error writing to Redis:', error);
    return false;
  }
}
