package songwy.com;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class TestSerializable {

	public static void main(String[] args) {
//		writeObject();
		readObject();
	}

	private static void writeObject() {
		try {
			ObjectOutputStream oo = new ObjectOutputStream(new FileOutputStream("c:/temp/TestSerializable"));
			Person p = new Person();
			p.setName("hello");
			oo.writeObject(p);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static void readObject() {
		try {
			ObjectInputStream in = new ObjectInputStream(new FileInputStream(FILE_PATH));
			Person p = (Person) in.readObject();
			System.out.println("test");
		} catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		
	}
	
	private static final String FILE_PATH = "c:/temp/TestSerializable";
}

class Person implements Serializable{
	private static final long serialVersionUID = -1919624809851412649L;
	
	public void setName(String name) {
		this.name = name;
	}

	private String name;
	private int id;
	private String sex;
}
