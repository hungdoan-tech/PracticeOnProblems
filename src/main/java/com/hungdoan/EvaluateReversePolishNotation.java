package com.hungdoan;

import java.util.Objects;
import java.util.Stack;

public class EvaluateReversePolishNotation {

    public int evalRPN(String[] tokens) {

        Stack<String> stack = new Stack<>();
        for (String token : tokens) {

            if (isOperator(token)) {
                String secondValue = stack.pop();
                String firstValue = stack.pop();
                int result = operate(token, secondValue, firstValue);
                stack.add(String.valueOf(result));
                continue;
            }

            stack.add(token);
        }

        return Integer.valueOf(stack.pop());
    }

    private boolean isOperator(String token) {

        if (Objects.equals(token, "+") || Objects.equals(token, "-") || Objects.equals(token, "*") || Objects.equals(token, "/")) {
            return true;
        }

        return false;
    }

    private int operate(String operator, String secondValue, String firstValue) {

        int intSecondValue = Integer.parseInt(secondValue);

        int intFirstValue = Integer.parseInt(firstValue);

        if (Objects.equals(operator, "+")) {
            return intFirstValue + intSecondValue;
        }

        if (Objects.equals(operator, "-")) {
            return intFirstValue - intSecondValue;
        }

        if (Objects.equals(operator, "*")) {
            return intFirstValue * intSecondValue;
        }

        if (Objects.equals(operator, "/")) {
            return intFirstValue / intSecondValue;
        }

        throw new RuntimeException("Invalid operator");
    }

    public static void main(String[] args) {
        EvaluateReversePolishNotation instance = new EvaluateReversePolishNotation();
        String[] expression = new String[]{"4", "13", "5", "/", "+"};
        int result = instance.evalRPN(expression);
        System.out.println(result);
    }
}
