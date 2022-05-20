export default function generateDummyData(mock: any) {
  const role = mock({
    code: 0,
    data: {
      "list|10": [
        {
          "id|+1": 1,
          name: "@cname",
          "intro|1": ["超级管理员"],
          createAt: "@datetime()",
        },
      ],
    },
  });
}
