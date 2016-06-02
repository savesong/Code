package com.songwy.lab.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.songwy.lab.domain.Person;

@Mapper
public interface PersonMapper {

	@Select("select * from person where id = #{id}")
	Person selectByPrimaryKey(@Param("id") Integer id);

}
