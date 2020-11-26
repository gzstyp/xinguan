/*数据库名称*/
const dataName = 'fwtai';
/*数据库地址，uniapp推荐以下划线为开头,操作数据时,若是字符串的话,需要包装 "'dwz.cloud'" 或添加转义符 '\'dwz.cloud\'',否则报错 "code": -1404*/
const dataPath = '_doc/fwtai.db';
//数据库存在则打开，不存在则创建
export const connectDB = () =>{
  return new Promise((resolve,reject) =>{
    plus.sqlite.openDatabase({
      name:dataName,
      path:dataPath,
      success(data){
        resolve({code:200,msg:'操作成功'});
      },
      fail(err){
        reject({code:204,msg:err});
      }
    });
  });
};
//关闭数据库;完成数据库操作后,必须关闭数据库,否则可能会导致系统资源无法释放;
function closeDB(){
  return new Promise((resolve,reject) =>{
    plus.sqlite.closeDatabase({
      name:dataName,
      success(result){
        resolve(result);
      },
      fail(err){
        reject(err);
      }
    });
  });
}
//监听数据库是否已经打开;是返回true,否则false;this.$db.isOpen();
export const isOpen = () =>{
  //数据库打开了就返回true,否则返回false
  return plus.sqlite.isOpenDatabase({
    name:dataName,
    path:dataPath
  });
};
function selectData(sql){
  switchDB(1);
  return new Promise((resolve,reject) =>{
    plus.sqlite.selectSql({
      name:dataName,
      sql:sql,//参数为字符串时,表示执行单条SQL语句;参数为字符串数组时表示执行多条SQL语句;
      success(data){
        if(data.length === 0){
          resolve({code:201,msg:'暂无数据'});
        }else{
          resolve({code:200,data:data,msg:'操作成功'});
        }
      },
      fail(err){
        reject({code:204,msg:err});
      }
    });
    switchDB(0);
  });
}
/*开启或关闭数据库;开启或关闭类型:type=1打开;0关闭;*/
function switchDB(type){
  if(type === 1){
    const open = isOpen();
    if(!open){
      connectDB();
    }
  }
  if(type === 0){
    const open = isOpen();
    if(open){
      closeDB();
    }
  }
}
/*创建表、添加、删除、更新操作*/
function execute(sql){
  switchDB(1);
  return new Promise((resolve,reject) =>{
    plus.sqlite.executeSql({
      name:dataName,
      sql:sql,
      success(result){
        resolve({code:200,msg:'操作成功'});
      },
      fail(err){
        reject({code:204,msg:err});
      }
    });
    switchDB(0);
  });
}
//table表名;返回的fields,*也可以;wheres是where条件查询KV对象,当为{}时是返回全部数据;
function queryData(table,fields,wheres){
  return queryPageData(table,fields,wheres);
}
//带分页,table表名;返回的fields,*也可以;wheres是where条件查询KV对象,当为{}时是返回全部数据;current是当前页,pageSize每页大小;
function queryPageData(table,fields,wheres,current,pageSize){
  let sql = '';
  if(fields == '*'){
    sql = 'select * from ' + table;
  }else{
    let column = '';
    fields.forEach(item =>{
      column += item+',';
    });
    column = column.substr(0,column.length-1);
    sql = 'select '+column+' from ' + table;
  }
  if(wheres){
    let where = '';
    for(let key in wheres){
      var value = wheres[key];
      /* if(typeof(value)=='string'){
        value = '\'' +value+ '\'';//处理字符串
      } */
      where += key + ' = '+ value + ' and ';
    }
    if(where.length > 0){
      where = where.substr(0,where.length-4);
      sql += ' where ' +where;
    }
  }
  if(current != undefined && pageSize != undefined){
    if(current <= 0){
      current = 1;
    }
    let section = (current - 1) * pageSize;
    sql += ' limit '+section+','+pageSize;
  }
  return sql;
}
//查询数据,table表名;fields返回字段;wheres查询条件,其格式:id=1 and name like '%田'
function queryLikeData(table,fields,wheres){
  return queryLikePageData(table,fields,wheres);
}
//查询数据;带分页功能,table表名;fields返回字段;wheres查询条件;current是当前页,pageSize每页大小;
function queryLikePageData(table,fields,wheres,current,pageSize){
  let sql = '';
  if(fields == '*'){
    sql = 'select * from ' + table;
  }else{
    let column = '';
    fields.forEach(item =>{
      column += item+',';
    });
    column = column.substr(0,column.length-1);
    sql = 'select '+column+' from ' + table;
  }
  if(wheres){
   sql += ' where ' + wheres;
  }
  if(current != undefined && pageSize != undefined){
    if(current <= 0){
      current = 1;
    }
    let section = (current - 1) * pageSize;
    sql += ' limit '+section+','+pageSize;
  }
  return sql;
}
//返回数组,this.$db.queryList().then(data =>{}).catch(err =>{});
export const queryList = (params) =>{
  var fields = ['id','name','gender'];
  const sql = queryData('userInfo',fields,params);
  return selectData(sql);
};
//创建表,this.$db.createTable().then(data =>{}).catch(err =>{});
export const createTable = () =>{
  const sql = 'create table if not exists userInfo("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"name" TEXT,"gender" TEXT,"avatar" TEXT)';
  return execute(sql);
};
//this.$db.add().then(data =>{}).catch(err =>{});
export const add = (obj) =>{
	if(obj !== undefined){
    //判断传的参是否有值
    var b = (JSON.stringify(obj) == "{}");
    if(!b){
      //obj传来的参数对象
      var id = obj.id || null; //id
      var name = obj.name || null; //名称
      var gender = obj.gender || null; //性别
      var avatar = obj.avatar || null; //头像
      const sql = 'insert into userInfo(name,gender,avatar) values("'+name+'","'+gender+'","'+avatar+'")';
      return execute(sql);
    }else{
      return new Promise((resolve,reject) =>{reject({code:199,msg:'添加失败'})});
    }
  }else{
    return new Promise((resolve,reject) =>{reject({code:199,msg:'参数有误'})});
  }
};
//this.$db.edit(id,name).then(data =>{}).catch(err =>{});
export const edit = (id,name) =>{
  let sql = 'update userInfo set name = '+ name +' where id ='+id;
  return execute(sql);
};
//this.$db.del(id).then(data =>{}).catch(err =>{});
export const del = (id) =>{
  var sql = 'delete from userInfo where id='+id;
  return execute(sql);
};