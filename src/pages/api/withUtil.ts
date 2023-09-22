import { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = ['http://localhost:4200'];

export async function withAllowCors(req: NextApiRequest, res: NextApiResponse, callback: () => Promise<unknown>) {
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Các tiêu đề được phép
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400'); // Thời gian lưu trữ bộ nhớ đệm CORS trong giây
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
      // Xử lý yêu cầu OPTIONS và trả về trước
      res.status(200).end();
      return;
    }
    await callback();
  } else {
    res.status(400).json({ msg: 'Bad Request' });
  }
}
