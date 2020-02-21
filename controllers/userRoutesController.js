const path = require("path");
const fs = require("fs");

const readFile = (path, opts = "utf8") =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

exports.getUsersStatistics = async (req, res) => {
  const usersPath = path.join(__dirname, "../", "data", "users.json");
  const usersStatisticsPath = path.join(__dirname, "../", "data", "users_statistic.json");
  try {
    const users = JSON.parse(await readFile(usersPath));
    const usersStatistics = JSON.parse(await readFile(usersStatisticsPath));

    const asyncWork = () => {
      usersStatistics.forEach(record => {
        const user = users.find(user => user["id"] === record["user_id"]);
        user["total_clicks"] = (user["total_clicks"] || 0) + record["clicks"];
        user["total_page_views"] = (user["total_page_views"] || 0) + record["page_views"];
      });

      let currentPage = req.query.page || 1;
      const perPage = req.query.amount;
      const totalAmount = users.length;
      const usersSliced = users.slice((currentPage - 1) * perPage, currentPage * perPage);
      return res.status(200).json({ users: usersSliced, totalAmount });
    };
    setTimeout(asyncWork);
  } catch (error) {
    return res.status(503).json({ error: "oops. something went wrong" });
  }
};

exports.getUserData = async (req, res) => {
  const usersPath = path.join(__dirname, "../", "data", "users.json");
  const usersStatisticsPath = path.join(__dirname, "../", "data", "users_statistic.json");
  try {
    const users = JSON.parse(await readFile(usersPath));
    const usersStatistics = JSON.parse(await readFile(usersStatisticsPath));

    const asyncWork = () => {
      const userId = req.params.userId;
      const user = users.find(user => user["id"] === +userId);
      if (!user) {
        return res.status(404).json("user not found");
      }
      const fromDate = req.query.fromDate;
      const toDate = req.query.toDate;
      const clicks = {};
      const views = {};

      usersStatistics.forEach(record => {
        if (
          record["user_id"] === +userId &&
          record["date"] >= fromDate &&
          record["date"] <= toDate
        ) {
          clicks[record["date"]] = record["clicks"];
          views[record["date"]] = record["page_views"];
        }
      });

      return res.status(200).json({ user, clicks, views });
    };
    setTimeout(asyncWork);
  } catch (error) {
    return res.status(503).json({ error: "oops. something went wrong" });
  }
};
