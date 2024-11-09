package com.hungdoan;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class BasicCalculatorII {

    public int calculate(String s) {

        Stack<Character> operands = new Stack<>();
        List<Object> outputs = new ArrayList<>();

        char[] charArray = s.toCharArray();

        for (int index = 0; index < charArray.length; index++) {
            char currentChar = charArray[index];

            if (currentChar == ' ') {
                continue;
            }

            if (isOperator(currentChar)) {

                if (currentChar == '-' && outputs.isEmpty()) {
                    outputs.add(0); // Treat unary minus as subtracting from 0
                }

                if (currentChar == '-' && !outputs.isEmpty() && outputs.get(outputs.size() - 1) instanceof Integer && Character.isDigit(charArray[index + 1])) {
                    while (!operands.isEmpty() && precedence(operands.peek()) >= precedence(currentChar)) {
                        outputs.add(operands.pop());
                    }
                    operands.add(currentChar);
                    continue;
                }

                if (currentChar == '-' && index + 1 < charArray.length && Character.isDigit(charArray[index + 1])) {
                    outputs.add(0); // Treat unary minus as subtracting from 0
                }

                while (!operands.isEmpty() && precedence(operands.peek()) >= precedence(currentChar)) {
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
                while (index < charArray.length && Character.isDigit(charArray[index])) {
                    sb.append(charArray[index]);
                    index++;
                }
                index--;

                int value = Integer.parseInt(sb.toString());
                outputs.add(value);
                continue;
            }
        }

        while (!operands.isEmpty()) {
            outputs.add(operands.pop());
        }

        Stack<Integer> resultStack = new Stack<>();
        for (Object element : outputs) {
            if (element instanceof Integer) {
                resultStack.add((Integer) element);
                continue;
            }

            char operator = (Character) element;
            int num2 = resultStack.pop();
            int num1 = resultStack.pop();
            resultStack.add(operate(operator, num1, num2));
        }

        return resultStack.peek();
    }

    private int operate(char operator, int firstValue, int secondValue) {
        switch (operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return firstValue / secondValue;
            default:
                throw new RuntimeException("Invalid operator");
        }
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
        expression = "1-(     -2)";
        expression = "-2+ 1";
        expression = " - (3 + (4 + 5))";
        expression = "1-1";
        expression = "1  -  (    -2  )";

        expression = "1  -  (    -2  )";
        int calculate = instance.calculate(expression);
        System.out.println(calculate);
    }
}
