// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { type, duration } = req.query;

  let ticks = 0;

  if (!duration || !type) {
    res
      .status(400)
      .json({ error: "An invalid 'type' or 'duration' was specified" });
    return;
  }

  switch (type.toLowerCase()) {
    case "second":
    case "s":
    case "seconds": {
      ticks = duration * 20;
      break;
    }
    case "minute":
    case "m":
    case "minutes": {
      ticks = duration * 20 * 60;
      break;
    }
    case "h":
    case "hour":
    case "hours": {
      ticks = duration * 20 * 60 * 60;
      break;
    }
    default: {
      res.status(400).json({ error: `${type} is an invalid type` });
      return;
    }
  }

  res.status(200).json({ ticks });
}
