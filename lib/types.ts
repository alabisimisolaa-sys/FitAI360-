// lib/types.ts

export interface IntakeData {
    step1Field1: string;
    step1Field2: string;
    step2Field1: string;
    step2Field2: string;
    step3Field1: string;
    step3Field2: string;
    step4Field1: string;
    step4Field2: string;
    step5Field1: string;
    step5Field2: string;
    step6Field1: string;
    step6Field2: string;
}

export interface GeneratedPlan {
    name: string;
    email: string;
    planText: string;
    generatedTimestamp: string;
}