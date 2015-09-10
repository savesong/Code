package com.songwy.algorithm;

import java.util.LinkedList;

public class Arrays {

    public static void main(String[] args) {
        int[] array1 = { 2, 7, 1, 3, 5, 6, 4 };
        sort(array1);
        printArray(array1);

        int[] array2 = { 3, 5, 2, 3, 66, 225, 1 };
        sort(array2);
        printArray(array2);

        int[] array3 = { 1, 2, 3, 4, 5, 6, 7 };
        sort(array3);
        printArray(array3);

        int[] array4 = { 7, 6, 5, 4, 3, 2, 1 };
        sort(array4);
        printArray(array4);
    }

    public static void sort(int[] array) {
        sortRecursively(array);
//        sortIteratively(array);
    }

    private static void sortRecursively(int[] array) {
        if (array == null || array.length == 0) {
            return;
        }

        sortRecursively(array, 0, array.length - 1);
    }

    private static void sortRecursively(int[] array, int left, int right) {
        if (left < right) {
            int index = partition(array, left, right);
            sortRecursively(array, left, index - 1);
            sortRecursively(array, index + 1, right);
        }
    }

    private static int partition(int[] array, int left, int right) {
        int pivot = array[right];
        int small = left - 1;
        for (int i = left; i < right; i++) {
            if (array[i] <= pivot) {
                ++small;
                swap(array, i, small);
            }
        }
        swap(array, small + 1, right);
        return small + 1;
    }

    private static void swap(int[] array, int i, int j) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }

    public static void sortIteratively(int[] array) {
        if (array == null || array.length == 0) {
            return;
        }

        sortIteratively(array, 0, array.length - 1);
    }

    private static void sortIteratively(int[] array, int left, int right) {
        if (left < right) {
            queue.add(new Range(left, right));
        }

        while (!queue.isEmpty()) {
            Range range = queue.poll();
            if (null != range) {
                int index = partition(array, range.left, range.right);
                if (range.left < index - 1) {
                    queue.add(new Range(range.left, index - 1));
                }
                if (index + 1 < range.right) {
                    queue.add(new Range(index + 1, range.right));
                }
            }
        }
    }

    public static void printArray(int[] array) {
        for (int i : array) {
            System.out.print(i + " ");
        }
        System.out.println();
    }

    private static LinkedList<Range> queue = new LinkedList<Range>();
}

class Range {
    public Range(int left, int right) {
        this.left = left;
        this.right = right;
    }

    public int left;
    public int right;
}
