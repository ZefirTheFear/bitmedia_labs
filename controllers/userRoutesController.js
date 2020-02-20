const cloneDeep = require("clone-deep");

const users = require("../data/users.json");
const usersStatistics = require("../data/users_statistic.json");

exports.getUsersStatistics = (req, res) => {
  try {
    const usersClone = cloneDeep(users);

    usersStatistics.forEach(record => {
      const user = usersClone.find(user => user["id"] === record["user_id"]);
      user["total_clicks"] = (user["total_clicks"] || 0) + record["clicks"];
      user["total_page_views"] = (user["total_page_views"] || 0) + record["page_views"];
    });

    let currentPage = req.query.page || 1;
    const perPage = req.query.amount;
    const totalAmount = users.length;
    const usersSliced = usersClone.slice((currentPage - 1) * perPage, currentPage * perPage);
    return res.status(200).json({ users: usersSliced, totalAmount });
  } catch (error) {
    return res.status(503).json({ error: "oops. something went wrong" });
  }
};

exports.getUserData = (req, res) => {
  try {
    const userId = req.params.userId;
    const usersClone = cloneDeep(users);
    const user = usersClone.find(user => user["id"] === +userId);
    if (!user) {
      return res.status(404).json("user not found");
    }
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const clicks = {};
    const views = {};

    usersStatistics.forEach(record => {
      if (record["user_id"] === +userId && record["date"] >= fromDate && record["date"] <= toDate) {
        clicks[record["date"]] = record["clicks"];
        views[record["date"]] = record["page_views"];
      }
    });

    return res.status(200).json({ user, clicks, views });
  } catch (error) {
    return res.status(503).json({ error: "oops. something went wrong" });
  }
};
