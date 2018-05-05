document.getElementById('issueInputForm').addEventListener('submit', saveIssue); //event listener for form submit.

function saveIssue(e) {
  var issueId = chance.guid();
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueStatus = 'Open';
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }
  
  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues')); // converting JSON object to javascript array object.
    issues.push(issue); // javascript method to add values to array object.
    localStorage.setItem('issues', JSON.stringify(issues)); // again converting js array to JSON object to store in local storage.
  }
  /*because information between server and client can only be 
	exchanged in text format using JSON file. 
  */
  document.getElementById('issueInputForm').reset();
 
  fetchIssues();
  
  e.preventDefault(); 
}

function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }
    
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}

function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}



	function fetchIssues () { 
  var issues = JSON.parse(localStorage.getItem('issues')); //retrieving issues from local storage
  var issuesList = document.getElementById('issuesList'); //issuesList from div element inside body
  
  issuesList.innerHTML = '';
  
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;
    
    issuesList.innerHTML +=   '<div class="well">'+ // bootstrap well class
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                              '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                              '</div>';

                              
  }
}
