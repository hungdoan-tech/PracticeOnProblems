package com.hungdoan;

import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class BasicCalculatorII {

    public int calculate(String s) {

        Stack<Character> operands = new Stack<>();
        List<Object> outputs = new LinkedList<>();

        char[] charArray = s.toCharArray();

        for (int index = 0; index < charArray.length; index++) {

            char currentChar = charArray[index];

            if (currentChar == ' ') {
                continue;
            }

            if (isOperator(currentChar)) {
                while (!operands.isEmpty() && isOperator(operands.peek()) && precedence(operands.peek()) >= precedence(currentChar)) {
                    outputs.add(operands.pop());
                }
                operands.add(currentChar);
                continue;
            }

            if (currentChar == '(') {
                operands.add(currentChar);
                continue;
            }

            if (currentChar == ')') {
                while (operands.peek() != '(') {
                    outputs.add(operands.pop());
                }
                operands.pop();
                continue;
            }

            if (Character.isDigit(currentChar)) {

                StringBuilder sb = new StringBuilder();

                while (index < charArray.length) {

                    if (Character.isDigit(charArray[index])) {
                        sb.append(charArray[index]);
                        index++;
                        continue;
                    }

                    index--;
                    break;
                }

                outputs.add(Integer.parseInt(sb.toString()));
            }
        }

        while (!operands.isEmpty()) {
            outputs.add(operands.pop());
        }

        Stack<Integer> result = new Stack<>();
        for (Object element : outputs) {
            if (element instanceof Integer) {
                result.add((Integer) element);
                continue;
            }

            Integer num2 = result.pop();
            Integer num1 = result.pop();
            result.add(operate((Character) element, num1, num2));
        }

        return result.peek();
    }

    private int operate(char operator, int firstValue, int secondValue) {

        if (operator == '+') {
            return firstValue + secondValue;
        }

        if (operator == '-') {
            return firstValue - secondValue;
        }

        if (operator == '*') {
            return firstValue * secondValue;
        }

        if (operator == '/') {
            return firstValue / secondValue;
        }

        throw new RuntimeException("Invalid operator");
    }

    private boolean isOperator(char currentChar) {
        return currentChar == '+' || currentChar == '-' || currentChar == '*' || currentChar == '/';
    }

    private int precedence(char operator) {
        if (operator == '+' || operator == '-') {
            return 1;
        }
        if (operator == '*' || operator == '/') {
            return 2;
        }
        return -1;
    }

    public static void main(String[] args) {
        BasicCalculatorII instance = new BasicCalculatorII();
        String expression = "(3 + 5) * ((2 + 4) / 3)";
        expression = "1-1+1";
        int calculate = instance.calculate(expression);
        System.out.println(calculate);
    }
}
