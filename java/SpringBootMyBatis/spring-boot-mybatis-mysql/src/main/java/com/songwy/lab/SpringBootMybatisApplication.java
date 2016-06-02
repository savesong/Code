package com.songwy.lab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.songwy.lab.dao.PersonMapper;
import com.songwy.lab.domain.Person;

@SpringBootApplication
public class SpringBootMybatisApplication implements CommandLineRunner {

	@Autowired
	private PersonMapper personMapper;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootMybatisApplication.class, args);
	}

	public void run(String... arg0) throws Exception {
		Person p = this.personMapper.selectByPrimaryKey(2);
		System.out.println(p.getName());
	}

}
