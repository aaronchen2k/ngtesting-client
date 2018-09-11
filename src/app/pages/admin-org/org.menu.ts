export const ORG_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'org-admin/org/list',
        data: {
          menu: {
            title: '我的组织列表',
            icon: 'ion-edit',
            selected: false,
            order: 1,
          },
        },
      },

      {
        path: 'org-admin/org/list',
        data: {
          menu: {
            title: '当前组织',
            icon: 'ion-edit',
            selected: false,
            order: 2,
          },
        },
      },

      {
        path: '',
        data: {
          menu: {
            title: '组织管理',
            icon: 'ion-edit',
            selected: true,
            expanded: true,
            order: 1,
          },
        },
        children: [
          {
            path: 'org-admin/user/list',
            data: {
              menu: {
                title: '组织用户',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/org-role/list',
            data: {
              menu: {
                title: '组织角色',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/project-role/list',
            data: {
              menu: {
                title: '项目角色',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/property/case-type/list',
            data: {
              menu: {
                title: '用例属性',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
        ],
      },

      {
        path: '',
        data: {
          menu: {
            title: '问题跟踪',
            icon: 'ion-edit',
            selected: true,
            expanded: true,
            order: 1,
          },
        },
        children: [
          {
            path: 'org-admin/issue/type/list',
            data: {
              menu: {
                title: '问题类型',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/issue/field/list',
            data: {
              menu: {
                title: '问题字段',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/issue/field/list',
            data: {
              menu: {
                title: '问题界面',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/issue/field/list',
            data: {
              menu: {
                title: '工作流',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/issue/priority/list',
            data: {
              menu: {
                title: '优先级',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/issue/status/list',
            data: {
              menu: {
                title: '问题状态',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/issue/resolution/list',
            data: {
              menu: {
                title: '解决措施',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/issue/privilege/list',
            data: {
              menu: {
                title: '权限方案',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/issue/priority/list',
            data: {
              menu: {
                title: '消息通知',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
        ],
      },
    ],
  },
];
