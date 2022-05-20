const pathMapper = {
  children: {
    analysis: {
      name: "系统总览",
      children: {
        overview: {
          name: "核心技术",
          children: null,
        },
        dashboard: {
          name: "商品统计",
          children: null,
        },
      },
    },
    system: {
      name: "系统管理",
      children: {
        user: {
          name: "用户管理",
          children: null,
        },
        department: {
          name: "部门管理",
          children: null,
        },
        menu: {
          name: "菜单管理",
          chidlren: null,
        },
        role: {
          name: "角色管理",
          children: null,
        },
      },
    },
    product: {
      name: "商品中心",
      children: {
        category: {
          name: "商品类别",
          children: null,
        },
        goods: {
          name: "商品信息",
          children: null,
        },
      },
    },
    story: {
      name: "随便聊聊",
      children: {
        chat: {
          name: "你的故事",
          children: null,
        },
        list: {
          name: "故事列表",
          children: null,
        },
      },
    },
  },
};

export default function (pathStr: string): string {
  const paths = pathStr.split("/").slice(2);

  const res: string[] = [];
  let next: any = pathMapper;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];
    if (next?.children) {
      next = next?.children[key];
      res.push(next?.name);
    }
  }
  // console.log("res=", res);

  return res.join(" / ");
}
