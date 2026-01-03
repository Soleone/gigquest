import { Job } from '@/types/game';

export const BETTYS_BAKERY: Job = {
  id: 'job-001-bettys-bakery',
  title: 'Daily Sales Tracker',
  clientName: 'Betty',
  clientPersonality: 'warm',
  
  briefing: `Oh! Someone responded! Thank goodness...

I run a small bakery down on Main Street. I'm not very good with computers, but my nephew said I should track my daily numbers.

I just need help with some simple calculations. Nothing fancy! Just... storing numbers and doing basic math.

Can you help me?`,
  
  description: 'Help Betty track her daily bakery sales and calculate profit.',
  
  successMessage: `Oh my goodness, thank you so much! This is wonderful!

Here's your payment. You did such a great job - my friend Mario who runs the pizza shop needs help too. Can I refer you to him?

*You completed your first gig!*`,
  
  difficulty: 1,
  estimatedTime: 15,
  
  tasks: [
    {
      id: 'task-001-store-sales',
      jobId: 'job-001-bettys-bakery',
      order: 1,
      story: `I counted today's receipts. We made $450 in sales today.

Can you store that number in a variable called "sales"?`,
      guide: `Beep boop! 🤖 I'm Chip, your AI coding assistant.

Betty needs to remember a number. In JavaScript, we use **variables** to store data.

Use the keyword 
let
 followed by the name 
 sales 
 to create a variable, and assign it the value 
 450 
.`,
      teachesSkills: ['let', 'number'],
      starterCode: `// Store the sales amount with let\n\n`,
      tests: [
        {
          id: 'test-001-sales-exists',
          name: 'Sales variable exists',
          description: 'Check if sales variable is defined',
          type: 'variable',
          expectedVariables: { sales: 450 },
          passMessage: 'Perfect! You stored the sales amount correctly.',
          failMessage: 'Make sure to create a variable called "sales" with the value 450 using "let".'
        }
      ]
    },
    {
      id: 'task-002-update-sales',
      jobId: 'job-001-bettys-bakery',
      order: 2,
      story: `Oh dear, I missed a receipt under the register!

It wasn't $450, it was actually $460.

Can you update the "sales" variable to 460?`,
      guide: `Mistakes happen! Since we used 
 let 
, we can change (or "mutate") the value.

You don't need to write 
 let 
 again (that's only for creating new variables).

Just type the variable name 
 sales 
 and assign it the new value 
 460 
.`,
      teachesSkills: ['let', 'number'],
      starterCode: `// Update the existing sales variable\nlet sales = 450;\n\n`,
      tests: [ { id: 'test-002-sales-updated', name: 'Sales updated to 460', description: 'Check if sales variable is 460', type: 'variable', expectedVariables: { sales: 460 }, passMessage: 'Great! You updated the variable without errors.', failMessage: 'Set the "sales" variable to 460.' } ]
    },
    {
      id: 'task-003-store-costs',
      jobId: 'job-001-bettys-bakery',
      order: 3,
      story: `Great! Now I also need to track my costs.

Today I spent $180 on ingredients and supplies.

Can you store that in a new variable called "costs"?`,
      guide: `New data means a new variable! 

Create a variable named 
 costs 
 using 
 let 
 and set it to 
 180 
.`,
      teachesSkills: ['let', 'number'],
      starterCode: `// Store costs\nlet sales = 460;\n\n`,
      tests: [ { id: 'test-003-costs-exists', name: 'Costs variable exists', description: 'Check if costs variable is defined', type: 'variable', expectedVariables: { sales: 460, costs: 180 }, passMessage: 'Excellent! Both values are stored.', failMessage: 'Create a variable called "costs" with the value 180.' } ]
    },
    {
      id: 'task-004-calculate-profit',
      jobId: 'job-001-bettys-bakery',
      order: 4,
      story: `Perfect! Now here's the important part...

I need to know my profit. That's sales minus costs.

Can you calculate that and store it in a variable called "profit"?`,
      guide: `Computers are great at math! 🧮

Create a variable named 
 profit 
.

Instead of typing the numbers again, you can do math with the variables themselves: 
 sales - costs 
.`,
      teachesSkills: ['subtraction'],
      starterCode: `// Calculate profit from sales and costs\nlet sales = 460;\nlet costs = 180;\n\n`,
      tests: [ { id: 'test-004-profit-correct', name: 'Profit calculated correctly', description: 'Check if profit equals sales - costs', type: 'variable', expectedVariables: { sales: 460, costs: 180, profit: 280 }, passMessage: "Yes! That's the correct profit.", failMessage: 'Calculate profit by subtracting costs from sales: sales - costs' } ]
    },
    {
      id: 'task-005-const-rent',
      jobId: 'job-001-bettys-bakery',
      order: 5,
      story: `One last thing! My rent is always the same: $2000.

My nephew says if a number never changes, we should use "const" instead of "let".

Can you store the rent amount in a variable called "rent" using "const"?`,
      guide: `Betty's nephew is right! 

For values that shouldn't change (constants), we use the keyword 
 const 
 instead of 
 let 
.

Declare 
 rent 
 using 
 const 
 and set it to 
 2000 
.`,
      teachesSkills: ['const'],
      starterCode: `// Store fixed rent\nlet sales = 460;\nlet costs = 180;\nlet profit = sales - costs;\n\n`,
      tests: [
        {
          id: 'test-005-rent-defined',
          name: 'Rent defined with const',
          description: 'Check if rent variable is defined as a constant',
          type: 'custom',
          validationCode: `
            if (!variables.rent) return false;
            if (variables.rent !== 2000) return false;
            if (declarations['rent'] !== 'const') return false;
            return true;
          `,
          passMessage: 'Perfect! You used const for the fixed value.',
          failMessage: 'Make sure to create a variable called "rent" with value 2000 using "const".'
        }
      ]
    }
  ]
};

export const ALL_JOBS: Job[] = [BETTYS_BAKERY];
