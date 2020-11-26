//table表名;返回的fields,*也可以但字段会多一个list;wheres是where条件查询KV对象,当为{}时是返回全部数据;
function queryData(table,fields,wheres){
  return queryPageData(table,fields,wheres);
}
//带分页,table表名;返回的fields,*也可以但字段会多一个list;wheres是where条件查询KV对象,当为{}时是返回全部数据;current是当前页,pageSize每页大小;
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
      if(typeof(value)=='string'){
        value = '\'' +value+ '\'';
      }
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
/*数据库名称*/
const dataName = 'fwtai';
/*数据库地址，uniapp推荐以下划线为开头*/
const dataPath = '_doc/fwtai.db';
//创建数据库或者打开,this.$db.openSqlite().then(data =>{}).catch(err =>{});
export const openSqlite = () =>{
  return new Promise((resolve,reject) =>{
    plus.sqlite.openDatabase({
      name:dataName,
      path:dataPath,
      success(data){
        resolve({code : 200,msg : '操作成功'});
      },
      fail(err){
        reject({code : 199,msg : err});
      }
    });
  });
};
//创建表,this.$db.createTable().then(data =>{}).catch(err =>{});
export const createTable = () =>{
	return new Promise((resolve,reject) =>{
	//创建表格在executeSql方法里写
		plus.sqlite.executeSql({
			name:dataName,
			//表格创建或者打开，后面为表格结构
			sql:'create table if not exists userInfo("list" INTEGER PRIMARY KEY AUTOINCREMENT,"id" TEXT,"name" TEXT,"gender" TEXT,"avatar" TEXT)',
			success(data){
				resolve({code : 200,msg : '操作成功'});
			},
			fail(err){
				reject({code : 199,msg : err});
			}
		});
	});
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
      return new Promise((resolve,reject) =>{
        plus.sqlite.executeSql({
          name:dataName,
          sql:'insert into userInfo(id,name,gender,avatar) values("'+id+'","'+name+'","'+gender+'","'+avatar+'")',
          success(data){
            resolve({code : 200,msg : '操作成功'});
          },
          fail(err){
            reject({code : 199,msg : err});
          }
        });
      });
    }else{
      return new Promise((resolve,reject) =>{reject({code:199,msg:'添加失败'})});
    }
  }else{
    return new Promise((resolve,reject) =>{reject({code:199,msg:'参数有误'})});
  }
};
//返回数组,this.$db.query().then(data =>{}).catch(err =>{});
export const query = (params) =>{
  var fields = ['id','name','gender'];
  const sql = queryData('userInfo',fields,params);
	return new Promise((resolve,reject) =>{
		plus.sqlite.selectSql({
			name:dataName,
			sql:sql,
			success(data){
        if(data.length === 0){
          resolve({code : 201,msg : '暂无数据'});
        }else{
          resolve({code : 200,data : data,msg : '操作成功'});
        }
			},
			fail(err){
				reject({code : 199,msg : err});
			}
		});
	});
};
export const deleteInformationType = (table) =>{
  var sql = 'delete from '+table+' where id=1';
  return new Promise((resolve,reject) =>{
  	plus.sqlite.executeSql({
  		name:dataName,
  		sql:sql,
  		success(e){
  			resolve(e);
  		},
  		fail(e){
  			reject(e);
  		}
  	});
  });
};
export const edit = (name) =>{
  openSqlite();
  let sql = 'update userInfo set name = ' + name +' where id = 1';
	return new Promise((resolve,reject) =>{
		plus.sqlite.executeSql({
			name:dataName,
			sql:sql,
			success(data){
        resolve({code : 200,msg : '操作成功'});
			},
			fail(err){
				reject({code : 199,msg : err});
			}
		});
	});
};
//关闭数据库
export const closeSQL = () =>{
	return new Promise((resolve,reject) =>{
		plus.sqlite.closeDatabase({
			name:dataName,
			success(e){
				resolve(e);
			},
			fail(e){
				reject(e);
			}
		});
	});
};
//监听数据库是否开启
export const isOpen = () =>{
	//数据库打开了就返回true,否则返回false
	return plus.sqlite.isOpenDatabase({
    name:dataName,
    path:dataPath
  });
};