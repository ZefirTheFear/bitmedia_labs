const cloneDeep = require("clone-deep");

exports.getUsersStatistics = (req, res) => {
  try {
    const users = require("../data/users.json");
    const usersStatistics = require("../data/users_statistic.json");
    const usersModified = cloneDeep(users);

    usersStatistics.forEach(record => {
      const user = usersModified.find(user => user["id"] === record["user_id"]);
      user["total_clicks"] = (user["total_clicks"] || 0) + record["clicks"];
      user["total_page_views"] = (user["total_page_views"] || 0) + record["page_views"];
    });

    let currentPage = req.query.page || 1;
    const perPage = req.query.amount;
    const totalAmount = users.length;
    // if (currentPage * perPage - (perPage - 1) > totalAmount) {
    //   currentPage = totalAmount / perPage;
    // }
    const usersSliced = usersModified.slice((currentPage - 1) * perPage, currentPage * perPage);
    return res.status(200).json({ users: usersSliced, totalAmount });
  } catch (error) {
    return res.status(503).json({ error: "oops. something went wrong" });
  }
};
