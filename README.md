# Moneytracker (I don't like this name but wtv)
  This is a personal project created with the goal to improve my skills with react/redux and nodejs/mongodb and have a personal space to store things related to payments.

  It will scale to things beyond just tracking expenses. Manage documents, track time and add hourly rates, set an agenda and alerts, etc.

  This is what is working now:
  - Add daily expenses.
  - Set a total budget and keep track of it according to spendings.
  - View all expenses on a date interval.

  ## Recent changes (This will most likely be outdated)
    - Add defined Categories and allow user to crud these categories (missing delete, no need for updated) 15/04/2023

  ## WIP before next deployment (This will most likely be outdated)
    - Edit / delete expenses

  ## BackLog
  ### Admin
    - Create admin panel/dashboard to get statistics of created users and user actions (don't track their expenses)
    - Add user actions (edit/delete users)
    - Track agendas when implemented (?)
  ### Expenses
    - Add pagination (Not very important rn but will be specially for desktop version)
    - Add recurring expense (every x days/month add expense). Maybe this will need a daily cron, or some other strategy
    - Change calendar to add visualization of days that have expenses (Low priority, but def nice to have)
  ### Documents
    - Upload documents (receipts, invoice, etc.)
    - CRUD documents (add a place to manage these documents)
    - Link document to expense
    - Allow to add documents without expense associated
  ### Graphics / Statistics
    - Add general statistics (start by spendings per day / week / month)
    - Allow multiple filter, we only have category now. Could be filter by card or by card type
  ### Time tracker
    - CRUD time tracker
    - Add details to tracker (not sure what this means but add a name or category that describes what this tracker is for)
    - Add start/pause/stop counter (if pause keep counter in memory, even if user closes browser)
    - Add option to add rate for tracker (rate per minute/hour/day)
    - Add page to manage trackers (see list of time trackers and their details and if tracker has a rate, display total pay)
  ### Agenda
    - Simple agenda with reminder / notes
    - Allow for future spending, scheduled on agenda
  ### Multiple cards
    - Add multiple cards to the platform and control spendings by card
    - Add total budget per card
    - Add card type (debit, credit, ...)
    
