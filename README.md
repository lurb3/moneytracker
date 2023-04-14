# moneytracker
  This is a personal project created with the goal to improve my skills with react/redux and nodejs/mongodb and have a personal space to store things related to payments.

  It will scale to things beyond just tracking expenses. Manage documents, track time and add hourly rates, set an agenda and alerts, etc.

  This is what is working now:
  - Add daily expenses.
  - Set a total budget and keep track of it according to spendings.
  - View all expenses on a date interval.

  ## Main things to work on
  ### Expenses
    - Edit / delete expenses
    - Change calendar to add visualization of days that have expenses (Low priority, but def nice to have)
  ### Documents
    - Upload documents (receipts, invoice, etc.)
    - CRUD documents (add a place to manage these documents)
    - Link document to expense
    - Allow to add documents without expense associated
  ### Graphics / Statistics
    - Add general statistics (start by spendings per day / week / month)
  ### Time tracker
    - CRUD time tracker
    - Add details to tracker (not sure what this means but add a name or category that describes what this tracker is for)
    - Add start/pause/stop counter (if pause keep counter in memory, even if user closes browser)
    - Add option to add rate for tracker (rate per minute/hour/day)
    - Add page to manage trackers (see list of time trackers and their details and if tracker has a rate, display total pay)
