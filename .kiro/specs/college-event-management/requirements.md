# Requirements Document

## Introduction

The College Event Management App is a focused mobile application MVP designed to streamline core event management and basic club communications within KMIT college for a 20-day development timeline. The app serves three primary user roles: Students, Club Heads, and Council Members (PR), with essential permissions and capabilities. The application features a centralized event calendar as the main interface, basic role-based access control, simplified club enrollment, and essential broadcast messaging functionality to enhance campus communication and event coordination.

## Requirements

### Requirement 1

**User Story:** As a student, I want to log in with my credentials and view the main event calendar, so that I can stay informed about upcoming college events.

#### Acceptance Criteria

1. WHEN a student opens the app THEN the system SHALL display a login screen with student and council login options
2. WHEN a student selects student login THEN the system SHALL prompt for name, roll number, and password
3. WHEN a student enters valid credentials THEN the system SHALL authenticate against the database and grant access
4. WHEN a student logs in successfully THEN the system SHALL display the event calendar as the main screen
5. WHEN a student's credentials don't match the database THEN the system SHALL display an error message
6. WHEN a student uses the initial password "Kmit123$" THEN the system SHALL allow login if other credentials match

### Requirement 2

**User Story:** As a student, I want to change my password after initial login, so that I can secure my account.

#### Acceptance Criteria

1. WHEN a student accesses their profile THEN the system SHALL provide an option to change password
2. WHEN a student enters a new password THEN the system SHALL validate it meets basic requirements
3. WHEN the password change is successful THEN the system SHALL update the database with new credentials
4. IF a student forgets their password THEN they must contact admin for reset (manual process for MVP)

### Requirement 3

**User Story:** As a council member, I want to log in with my club credentials, so that I can access administrative functions.

#### Acceptance Criteria

1. WHEN a council member selects council login THEN the system SHALL prompt for club name and password
2. WHEN a council member uses valid credentials THEN the system SHALL authenticate and grant appropriate access
3. WHEN a council member uses the initial password "Councilkmit25" THEN the system SHALL prompt for password change
4. WHEN a council member logs in successfully THEN the system SHALL create a session with basic timeout (simplified session management for MVP)

### Requirement 4

**User Story:** As a student, I want to view event details when I click on a calendar date, so that I can see event information including club name, timings, and venue.

#### Acceptance Criteria

1. WHEN a student clicks on a calendar date THEN the system SHALL display all events scheduled for that date
2. WHEN an event is displayed THEN the system SHALL show club name, event name, timings, and venue
3. WHEN event details are shown THEN the system SHALL allow students to register for the event
4. WHEN a student registers for an event THEN the system SHALL record their registration in the database

### Requirement 5

**User Story:** As a club head, I want to schedule events on the calendar, so that I can organize club activities and notify members.

#### Acceptance Criteria

1. WHEN a club head clicks on a calendar date THEN the system SHALL provide an option to book an event
2. WHEN a club head creates an event THEN the system SHALL capture event details including name, timing, and venue
3. WHEN an event is created THEN the system SHALL notify all club members automatically
4. WHEN a club head schedules an event THEN the system SHALL make it visible to all users on the calendar
5. WHEN a club head updates event details THEN the system SHALL reflect changes immediately

### Requirement 6

**User Story:** As a PR council member, I want to manage all events across clubs, so that I can maintain oversight and control over college activities.

#### Acceptance Criteria

1. WHEN a PR member views the calendar THEN the system SHALL allow editing, removing, or adding events for any club
2. WHEN a PR member removes an event THEN the system SHALL delete it from the calendar regardless of which club created it
3. WHEN a club head tries to remove an event THEN the system SHALL only allow removal of their own club's events
4. WHEN a PR member adds an event THEN the system SHALL post it immediately without requiring approval
5. WHEN a PR member edits an event THEN the system SHALL update the details and notify affected users

### Requirement 7

**User Story:** As a student, I want to access the notice board and club-specific communications, so that I can stay informed about college and club announcements.

#### Acceptance Criteria

1. WHEN a student scrolls down from the calendar THEN the system SHALL display three navigation buttons: notice board, your club, and college events
2. WHEN a student clicks notice board THEN the system SHALL display a broadcast channel for college-wide announcements
3. WHEN a student accesses the clubs section THEN the system SHALL show a list of clubs they are enrolled in
4. WHEN a student selects a club THEN the system SHALL display that club's broadcast channel
5. WHEN the navbar shows "kmit-all" and "clubs" THEN the system SHALL allow switching between college-wide and club-specific communications

### Requirement 8

**User Story:** As a student, I want to join clubs by submitting requests, so that I can participate in club activities and receive club communications.

#### Acceptance Criteria

1. WHEN a student goes to the clubs section THEN the system SHALL display a list of available clubs
2. WHEN a student selects a club to join THEN the system SHALL send a join request to the club head
3. WHEN a club head receives a join request THEN the system SHALL allow them to accept or deny it
4. WHEN a join request is accepted THEN the system SHALL add the student to the club and grant access to club communications
5. WHEN a student is accepted into a club THEN the system SHALL display the club name and provide access to club messages

### Requirement 9

**User Story:** As a club head, I want to manage club enrollments and send club-level broadcasts, so that I can control membership and communicate with my club members.

#### Acceptance Criteria

1. WHEN a club head receives enrollment requests THEN the system SHALL provide options to accept or deny each request
2. WHEN a club head accepts a member THEN the system SHALL add them to the club roster
3. WHEN a club head sends a broadcast THEN the system SHALL deliver it to all club members
4. WHEN a club head manages enrollments THEN the system SHALL update the member list in real-time
5. WHEN a club head views their club THEN the system SHALL display current member count and pending requests

### Requirement 10

**User Story:** As a PR council member, I want administrative access to manage events and communications, so that I can oversee college activities.

#### Acceptance Criteria

1. WHEN a PR member logs in THEN the system SHALL grant administrative access to all events and communications
2. WHEN a PR member manages events THEN the system SHALL allow full CRUD operations across all clubs
3. WHEN a PR member sends college-wide messages THEN the system SHALL broadcast to all users
4. WHEN a PR member views the system THEN they SHALL have the same interface as other users but with additional administrative controls
5. IF advanced analytics are needed THEN they will be added in future iterations (out of scope for 20-day MVP)