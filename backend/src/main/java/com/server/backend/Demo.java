package com.server.backend;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;

public class Demo {

    public static class User implements Comparable<User>{
        private int id;

        @Override
        public int hashCode() {
            return  this.id;
        }

        public User(int id){
            this.id=id;
        }

        public int getId() {
            return id;
        }

        @Override
        public int compareTo(User o) {
            return this.id - o.id;
        }

        @Override
        public boolean equals(Object obj) {
            if(obj instanceof User){
                return ((User) obj).getId()==this.id;
            }
            return super.equals(obj);
        }
    }

    public static void main(String[] args) {
//        HashMap<User, int[]> userFriends = new HashMap<>();
//        userFriends.put(new User(1),new int[]{1,2,3});
//        System.out.println(Arrays.toString(userFriends.get(new User(1))));
    }
}
