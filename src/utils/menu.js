module.exports = [
  { key: 'sub1', name: '材料管理',icon: 'appstore',clickable:false,
  	child:[{ key: '1',name: '材料数据库'}]
  },
  { key: 'product_management', name: '产品管理', icon: 'appstore',clickable:false,
    child:[{ key: 'products', name: '产品数据库'},]
  },
  { key: 'material_management', name: '主材管理',icon: 'appstore',clickable:false,
    child: [
      { key: 'ceramics', name: '瓷砖数据库'},
      { key: '4', name: '乳胶漆数据库'},
      { key: '5', name: '壁纸数据库'},
      { key: 'floors', name: '地板数据库'},
    ],
  },
  { key: 'supplier_management', name: '供应商管理' ,icon: 'appstore',clickable:false,
    child: [
    	{ key: 'suppliers', name:'供应商数据'}
    ]
  	
  }
];
