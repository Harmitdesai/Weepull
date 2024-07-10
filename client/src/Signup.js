import './Signup.css';

const Signup = () => {
    return (
    <div id="flexbox">
        <div id="container">
            <span id="signup">Sign Up</span>
            <div id="fillUp">
                <div class="elements" id="item1">
                    <span class="inputHeading">User Name</span>
                    <textarea id="usernameTA"></textarea>
                </div>
                <div class="elements" id="item2">
                    <span class="inputHeading">First Name</span>
                    <textarea id="firstnameTA"></textarea>
                </div>
                <div class="elements" id="item3">
                    <span class="inputHeading">Email</span>
                    <textarea id="emailTA"></textarea>
                </div>
                <div class="elements" id="item4">
                    <span class="inputHeading">Last Name</span>
                    <textarea id="lastnameTA"></textarea>
                </div>
                <div class="elements" id="item5">
                    <span class="inputHeading">Password</span>
                    <textarea id="passwordTA"></textarea>
                </div>
                <div class="elements" id="item6">
                    <span class="inputHeading">Date of Birth</span>
                    <textarea id="dobTA"></textarea>
                </div>
                <div class="elements" id="item7">
                    <span class="inputHeading">Confirm Password</span>
                    <textarea id="conpassTA"></textarea>
                </div>
                <div class="elements" id="item8">
                    <span class="inputHeading">Phone Number</span>
                    <textarea id="phoneTA"></textarea>
                </div>
                <div id="bottomleft">
                    <input type="checkbox" id="checkbox" />
                    <span id="span1">I agree to all statements and</span>
                    <a id="span2">Terms and Conditions</a>
                </div>
                <button id="submit">Submit</button>
            </div>
        </div>
    </div>
    );
}
 
export default Signup;