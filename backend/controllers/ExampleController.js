// https://stackoverflow.com/questions/39779068/mongodb-find-in-one-query-records-created-in-last-week-and-since-always
const example1 = () => {
  var today = new Date();
  var lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  var lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  var start = new Date(lastWeekStart.setHours(0,0,0,0));
  var end = new Date(lastWeekEnd.setHours(23,59,59,999));

  db.collection.aggregate([
      {
          "$group": {
              "_id": null,
              "total": { "$sum": 1 },
              "usersCreatedLastWeek": {
                  "$sum": {
                      "$cond": [
                          { 
                              "$and": [
                                  { "$gte": [ "$timeStamp", start ] },
                                  { "$lte": [ "$timeStamp", end ] }
                              ]
                          },
                          1,
                          0
                      ]
                  }
              }
          }
      }
  ])
    
}