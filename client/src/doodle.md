db.training_loads.aggregate(
[
{ $match: {weekNumber: 2,} },
{ $group: {_id: "$athleteName", total: {$sum: "$load"}} },
{ $sort: {_id: 1} }
]
)
